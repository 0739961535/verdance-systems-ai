#!/bin/bash
set -e

# Universal Agent Bootstrap Script
echo "🤖 Initializing Conductor Agent..."

# Load configuration
CONFIG_FILE=".conductor/config.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Configuration not found. Run 'python setup.py' first."
    exit 1
fi

# Determine agent role
AGENT_ROLE=${AGENT_ROLE:-$(python3 -c \
    "import sys; print(sys.argv[1] if len(sys.argv) > 1 else 'unknown')" $1)}
if [ "$AGENT_ROLE" = "unknown" ]; then
    echo "🔍 Agent role not specified. Available roles:"
    ls .conductor/roles/ | sed 's/.md$//' | sed 's/^/  - /'
    read -p "Enter your role: " AGENT_ROLE
fi

echo "👤 Agent Role: $AGENT_ROLE"

# Sync repository state
echo "🔄 Syncing repository state..."
git fetch origin
git pull origin main || true

# Load role-specific instructions
ROLE_FILE=".conductor/roles/${AGENT_ROLE}.md"
if [ ! -f "$ROLE_FILE" ]; then
    echo "❌ Role definition not found: $ROLE_FILE"
    exit 1
fi

echo "📖 Loaded role definition: $AGENT_ROLE"

# Check system dependencies
echo "🔍 Checking dependencies..."
python3 .conductor/scripts/dependency-check.py

# Attempt to claim a task
echo "🎯 Looking for available tasks..."
TASK_RESULT=$(python3 .conductor/scripts/task-claim.py --role "$AGENT_ROLE")

if echo "$TASK_RESULT" | grep -q "IDLE"; then
    echo "😴 No tasks available. Agent is idle."
    echo "💡 Check back later or create new tasks via GitHub issues."
    exit 0
fi

# Task claimed successfully
echo "✅ Task claimed successfully!"
echo "$TASK_RESULT" | python3 -m json.tool

# Create git worktree for isolated work
TASK_ID=$(echo "$TASK_RESULT" | python3 -c \
    "import json, sys; data=json.load(sys.stdin); print(data['task_id'])")
BRANCH_NAME="agent-$AGENT_ROLE-$TASK_ID"
WORKTREE_PATH="./worktrees/$BRANCH_NAME"

echo "🌳 Creating git worktree: $WORKTREE_PATH"
git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"

# Display next steps
echo ""
echo "🚀 Agent initialization complete!"
echo "📂 Your isolated workspace: $WORKTREE_PATH"
echo ""
echo "Next steps:"
echo "1. cd $WORKTREE_PATH"
echo "2. Review your task details in the output above"
echo "3. Implement according to specifications"
echo "4. Commit and push your changes"
echo "5. Create a pull request when ready"
