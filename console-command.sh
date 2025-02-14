# From /d:/SandBox/Task, run this command in the terminal:
paste -d ":" <(grep -oP '<span class="strong">\s*\K[\d\.]+%(?=\s*</span>\s*<span class="quiet">)' coverage/index.html) <(grep -oP '(?<=<span class="quiet">)[^<]+' coverage/index.html)
