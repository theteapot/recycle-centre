sudo docker login docker.io
sudo npm run docker-build
sudo npm run docker-push
# ~/.ssh/connect-to-recycle-centre-aws
# docker stop
# docker image pull theteapot/recycle-centre-server:latest
# docker run --rm -p 8888:5142 --name recycle-centre-server  --mount source=recycle-centre-volume,target=/data/db theteapot/recycle-centre-server