
- Sign in to aws console
- create ec2 instance 
- create key value pair as pem key while creating a ec2 instance 
- connect to ec2 instance
- install node version
- git clone 
- Frontend
   - npm install -> dependencies install
   - npm run build 
   - sudo apt update
   - sudo apt install nginx
   - sudo systemctl start nginx
   - sudo systemctl enable nginx
   - copy code from dist(build files) to /var/www/html
   - sudo scp -r dist/* /var/www/html
   - Enable port :80 for aws instance
-Backend
   - npm install
   - git pull (get the recently pushed changes into devTinder node js repo)
   - Allow EC2 instance IP address from mongo db database through network access 
   - add new inbound rules on EC2 instance where node js application is running
   - install pm2 (npm install pm2 -g)
   - pm2 start npm -- start
   - pm2 logs (to see logs if anything is not working)
   - pm2 flush npm (flush the logs of application whose name is npm)
   - pm2 list (list down the processes)
   - pm2 stop npm (stop the process whose name is npm)
   - pm2 delete npm (delete the process whose name is npm)
   - pm2 start npm --name "devtinder-backend" -- start (it will start the process whose name is devtinder-backend)
   - go and update nginx config 

      sudo nano /etc/nginx/sites-available/default and update below mentioned nginx config

            server_name 13.62.101.73; // this is ipv4 ip address of ec2 instance


            location /api/ {
                  proxy_pass http://localhost:3000/;
                  proxy_http_version 1.1;

                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "upgrade";
                  proxy_set_header Host $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto $scheme;
         }

   - after this restart nginx 
    sudo systemctl restart nginx
   - modify the BASEURL in frontend project to "/api/"

