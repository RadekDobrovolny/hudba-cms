#!/bin/sh
set -e

mkdir -p /data
chown -R nextjs:nodejs /data

exec su-exec nextjs "$@"
