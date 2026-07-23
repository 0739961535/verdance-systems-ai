<!-- CONDUCTOR:START -->
# 🤖 Code Conductor Agent Instructions

You are operating in a Code Conductor orchestrated project with automated task
management via GitHub Issues.

## Quick Start
To begin work as an agent, simply run:
```bash
./conductor start [role]
```

This single command will:
1. Show your role definition and capabilities
2. List available tasks appropriate for your role
3. Claim a task atomically
4. Set up your isolated workspace
5. Provide task context and success criteria

## Available Roles
- `dev`: Default generalist developer role
- `code-reviewer`: Automated AI-powered PR reviews
- `frontend`: Client-side development and UI
- `devops`: CI/CD, infrastructure, deployments
- `security`: Security audits and vulnerability management

## Core Commands
- `./conductor status` - View system status and your current task
- `./conductor tasks` - List all available tasks
- `./conductor complete` - Mark current task complete and get next
- `./conductor help` - Show role-specific guidance

## Workflow
1. Start: `./conductor start [role]`
2. Work in the created worktree following task specifications
3. Commit with conventional commits: `feat:`, `fix:`, `test:`, etc.
4. Run: `./conductor complete` when done
5. The system handles PR creation and moves you to the next task

<!-- CONDUCTOR:END -->

---

@AGENTS.md
