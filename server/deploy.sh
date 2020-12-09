~/.ssh/connect-to-recycle-centre-aws << 'EOF'
sudo docker stop $(sudo docker container ls -q --filter name=recycle-centre-server)
docker image prune -f
sudo docker image pull theteapot/recycle-centre-server:latest
sudo docker run --rm -p 8888:5142 --name recycle-centre-server  --mount source=recycle-centre-volume,target=/data/db theteapot/recycle-centre-server
EOF