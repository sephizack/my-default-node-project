# Default Node Project

## How to develop locally ?
- Clone **with submodules** if any

### Using NPM directly ###
- Instal node and npm on your computer
- Run `npm install`
- Run `npm start`
- Open http://localhost:80

### Using Docker ###
- Have Docker ready on your host:
    - Windows : https://docs.docker.com/docker-for-windows/install/
    - Ubuntu : https://docs.docker.com/install/linux/docker-ce/ubuntu/
    - Mac : https://docs.docker.com/docker-for-mac/install/
- Run `docker-compose up --build`
- Open http://localhost:80
- Simply update docker-compose file if you need to use a different port on your host