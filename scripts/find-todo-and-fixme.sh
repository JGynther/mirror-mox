# Excluding "scripts" dir to not find itself...
grep -R -E "TODO|FIXME" --exclude-dir=node_modules --exclude-dir=.venv * --exclude-dir=scripts