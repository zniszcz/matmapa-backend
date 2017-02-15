# Instalation

## Prerequirements
Make sure you have `docker` and `docker-compose` installed.

### 1. Add helper to your bashrc
``` sh
$ source /absolute/path/to/project/helper.sh
```

### 2. Run docker setup
``` sh
$ matmapa-backend setup
```

### 3. Install dependentcies
``` sh
$ matmapa-backend install
```

### 4. Run project
``` sh
$ matmapa-backend run
```
Your project should be avalaible at port `80`

To sync your project type:
``` sh
$ matmapa-backend sync
```

To access node CL type:
``` sh
$ matmapa-backend node
```
