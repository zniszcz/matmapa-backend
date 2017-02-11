# FROM etiv/nvm-base
FROM alpine:3.1
MAINTAINER Andrzej Górski "andrzejgorski@supermond.com"
WORKDIR /matmapa
EXPOSE 80
ENTRYPOINT ["bash"]
CMD ["node", "app.js"]
