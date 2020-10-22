docker volume create recycle-centre-volume
docker run --rm -p 8888:5142 --name recycle-centre-server  --mount source=recycle-centre-volume,target=/data/db theteapot/recycle-centre-server