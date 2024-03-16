# microservices-ticketing
Ticketing microservices with all fundamentals and necessary tool should have to build microservices. Testinig, npm package deployment for share common code base to other services as so on

#Run Project

install
  https://kubernetes.github.io/ingress-nginx/ (checkout the documentation and install)
    * kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml
  kubernetes
  docker

#Setup
  setup localhost domain in -> sudo nano /etc/hosts
  and add this line in the end of the file -> 127.0.0.1  ticketing.dev

run -> skaffold dev


