# Williams Liquor Store Dashboard

DDE is a web application that creates, vets and manages deals for Vodacom.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to run this project on your local machine, you'll need to have the following software installed:

- Git:
  - Windows: Download the installer from https://git-scm.com/download/win and run it.
  - Mac: Git comes pre-installed with MacOS.
  - Linux: Git can be installed via package manager, for example, on Ubuntu:
    ```
    $ sudo apt install git
    ```
- Docker:
  - Windows and Mac: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and enable Kubernetes in the settings afterwards.
  - Linux: Install [Docker](https://minikube.sigs.k8s.io/docs/drivers/docker/)
- Kubernetes:
  - Windows and Mac: Go to Docker settings and enable Kubernetes.
  - Linux: Install [minikube](https://minikube.sigs.k8s.io/docs/start/).
- kubectl:
  - Install [kubectl](https://kubernetes.io/docs/tasks/tools/) for your OS and confirm you can connect to your cluster with the following command.
    ```
    kubectl cluster-info
    ```
- Skaffold:
  - Install [Skaffold](https://skaffold.dev/docs/install/) for your OS.
- Node.js:
  - Windows: Download the installer from https://nodejs.org/en/download/ and run it.
  - Mac and Linux: You can install Node.js using a package manager.
- MySQL:
  - MySQL is a popular open-source relational database management system. You can download the installer from https://dev.mysql.com/downloads/installer/ or install it via a package manager such as Homebrew (https://brew.sh/) on MacOS or apt-get on Ubuntu. You can also follow the instructions on MySQL's website for manual installation: https://dev.mysql.com/doc/refman/8.0/en/installing.html

### Installing

This is a step by step series of examples that tell you how to get a development environment running.

1. Clone the repository

   ```
   git clone https://github.com/CondorgreenAdmin/DDE.git
   ```

2. Install Ingress-Nginx on your local cluster using the "ingress-nginx-setup.yaml" file found in the "infra/k8s-dev-setup" directory. For latest version of this file go to Ingress-Nginx [Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start).

   ```
   kubectl apply -f infra/k8s-local-setup/ingress-nginx-setup.yaml
   ```

3. Add the test domain name to Hosts file.

- (Windows) C:\Windows\System32\Drivers\etc\hosts
- (MacOs/Linux) /etc/hosts

  ```
  127.0.0.1   ddelocal.com
  ```

4. Apply one-time secrets to your cluster for MySQL

   ```
   kubectl create secret generic mysql-secret --from-literal=host=host.docker.internal --from-literal=database=ddelocal --from-literal=user=root --from-literal=password=password
   ```

   With "host" set to "host.docker.internal", it will allow the dde service to connect to your local MySQL Server outside of the Kubernetes cluster. You can change user and password to your credentials if you wish.

5. Apply one-time secrets to your cluster for the Mailer

   ```
   kubectl create secret generic mail-secret --from-literal=host=[mail_host_goes_here] --from-literal=port=[port_goes_here] --from-literal=user=[the_user_goes_here] --from-literal=pass=[the_password_goes_here] --from-literal=from=[from_email_goes_here]
   ```

   These values will be used by a mail service called nodemailer in the worker service to send mail notifications. Replace the placeholders with valid email settings to send emails.

6. Start the app in dev mode. Run the following command from the project root directory.

   ```
   skaffold dev
   ```

7. After all pods are started go to [ddelocal.com](http://ddelocal.com) in your browser.

#### Notes:

- Skaffold will build all the images of the app, apply them to the kubernetes cluster and start them.
- Skaffold will watch for file changes on files used for deployment, as specified in skaffold.yaml, and apply them to the running app automatically.
- Sometimes Skaffold doesn't apply the changes, in this event just restart Skaffold by stopping the running process with Ctrl+C and running "skaffold dev" again.

## Running the tests

TODO: //

## Deployment

This project is set up to deploy to a fully private AWS EKS cluster. Below are the deployment workflow steps.

### Deployment Workflow

- (Local Machine)
  - Make changes to code.
  - Commit code to a git branch (any besides main!).
  - Push branch to github.
- (Github)
  - Github receives updated branch.
  - You manually create a pull request to merge branch into main.
  - Github automatically runs tests for project.
  - After tests pass, you merge the pull request into main branch.
  - Because main branch has changed, github builds and deploys.

### Deployment Plan

- (Github)
  - Build new image(s)
  - Push to ECR
  - Update deployment(s)
  - Apply all yaml files in infra/k8s-prod to prod cluster

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on the process for submitting pull requests.

## Authors

- **Ghauth Christians** - _Initial Work_ - [gavinchristians](https://github.com/gavinchristians)
- **Julian Schubel** - _Initial Work_ - [julianschubel](https://github.com/julianschubel)
- **Christo Smuts** - _Initial Work_ - [ChristoSmuts](https://github.com/ChristoSmuts)
- **Arnulf Hanauer** - _Initial Work_ - [hana1ah](https://github.com/hana1ah)
