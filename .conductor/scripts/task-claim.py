#!/usr/bin/env python3
"""Task claiming script for atomic task assignment"""

import json
import sys
import fcntl
import argparse
from datetime import datetime
from pathlib import Path


class TaskClaimer:
    def __init__(self, role):
        self.role = role
        self.state_file = Path(".conductor/state.json")

    def claim_task(self):
        """Atomically claim an available task using GitHub Issues"""
        # Ensure file exists
        if not self.state_file.exists():
            return {"status": "ERROR", "message": "State file not found"}

        with open(self.state_file, "r+") as f:
            # Exclusive lock for atomic operations
            fcntl.flock(f, fcntl.LOCK_EX)

            try:
                state = json.load(f)
            except json.JSONDecodeError:
                return {"status": "ERROR", "message": "Invalid state file"}

            claimed_task = None

            # Find suitable task
            for i, task in enumerate(state.get("available_tasks", [])):
                # Check skill requirements
                required_skills = task.get("required_skills", [])

                # Hybrid logic: empty skills = any dev, otherwise need match
                if not required_skills or self.role in required_skills:
                    # Check no file conflicts
                    if not self._has_file_conflicts(task, state):
                        claimed_task = task
                        state["available_tasks"].pop(i)
                        break

            if claimed_task:
                # Create agent ID
                agent_id = f"{self.role}_{int(datetime.utcnow().timestamp())}"

                # Move to active work
                if "active_work" not in state:
                    state["active_work"] = {}

                state["active_work"][agent_id] = {
                    "task": claimed_task,
                    "status": "in_progress",
                    "started_at": datetime.utcnow().isoformat(),
                    "heartbeat": datetime.utcnow().isoformat(),
                    "files_locked": claimed_task.get("files_locked", []),
                }

                # Update agent counts
                if "system_status" not in state:
                    state["system_status"] = {}
                state["system_status"]["active_agents"] = len(state["active_work"])
                state["system_status"]["last_updated"] = datetime.utcnow().isoformat()

                # Write back atomically
                f.seek(0)
                json.dump(state, f, indent=2)
                f.truncate()

                # Release lock
                fcntl.flock(f, fcntl.LOCK_UN)

                # Return success with task details
                return {
                    "status": "claimed",
                    "task_id": claimed_task["id"],
                    "task": claimed_task,
                    "agent_id": agent_id,
                }
            else:
                # Release lock
                fcntl.flock(f, fcntl.LOCK_UN)
                return {"status": "IDLE", "reason": "No suitable tasks available"}

    def _has_file_conflicts(self, task, state):
        """Check if task files conflict with active work"""
        task_files = set(task.get("files_locked", []))
        if not task_files:
            return False

        for agent_work in state.get("active_work", {}).values():
            locked_files = set(agent_work.get("files_locked", []))
            if task_files & locked_files:  # Intersection = conflict
                return True

        return False


def main():
    parser = argparse.ArgumentParser(description="Claim a task for agent work")
    parser.add_argument("--role", default="dev", help="Agent role (default: dev)")
    args = parser.parse_args()

    claimer = TaskClaimer(args.role)
    result = claimer.claim_task()

    # Output result as JSON
    print(json.dumps(result))

    # Exit with appropriate code
    sys.exit(0 if result["status"] in ["claimed", "IDLE"] else 1)


if __name__ == "__main__":
    main()
