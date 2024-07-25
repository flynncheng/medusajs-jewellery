#!/usr/bin/env fish

# Start a new tmux session named 'store'
tmux new-session -d -s store



# Rename the first window and run the commands
tmux rename-window -t store:0 'store-backend'
tmux send-keys -t store:0 'cd ~/Oneo/working/medusajs/backend' C-m
tmux send-keys -t store:0 'bun dev' C-m

# Split the first window into two panes
tmux split-window -h -t store:0
tmux send-keys -t store:0.1 'cd ~/Oneo/working/medusajs/backend' C-m
tmux send-keys -t store:0.1 'vim' C-m
tmux send-keys -t store:0.1 ' e' C-m

# Resize the current pane
tmux resize-pane -L 50



# Create a second window and run the commands
tmux new-window -t store:1 -n 'store-frontend'
tmux send-keys -t store:1 'cd ~/Oneo/working/medusajs/frontend' C-m
tmux send-keys -t store:1 'bun dev' C-m

# Split the second window into two panes
tmux split-window -h -t store:1
tmux send-keys -t store:1.1 'cd ~/Oneo/working/medusajs/frontend' C-m
tmux send-keys -t store:1.1 'vim' C-m
tmux send-keys -t store:1.1 ' e' C-m

# Resize the current pane
tmux resize-pane -L 50



# Create a third window and run the commands
tmux new-window -t store:2 -n 'jewellery'
tmux send-keys -t store:2 'cd ~/Oneo/working/medusajs/medusajs-jewellery' C-m
tmux send-keys -t store:2 'bun dev' C-m

# Split the second window into two panes
tmux split-window -h -t store:2
tmux send-keys -t store:2.1 'cd ~/Oneo/working/medusajs/medusajs-jewellery' C-m
tmux send-keys -t store:2.1 'vim' C-m
tmux send-keys -t store:2.1 ' e' C-m

# Resize the current pane
tmux resize-pane -L 50



# Attach to the session
tmux attach -t store
