
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

#Adding a custom Domain name

- purchase domain name fro godaddy 
- signup on cloudflare and add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- Wait for sometime till your nameserver will updated ~ approximately it will take 15 mins
- DNS record : A vinodsalunke.com
- Enable SSL certificate 
- cluodflare.com -> dashboard > SSL/TLS -> Overview -> configure  -> custom SSL/TLS -> select flexible -> save


#Send an email using Amazon SES(Simple Email Service)

- Login into Amazon aws console
- Search IAM 
- Go to IAM
- Create a new user
   - Enter user name which you want to create 
   - Click next
   - Select 'Attach policy direct' as Permission options
   - Search 'amazon ses' as permission polices and select 'AmazonSESFullAccess' and click next
   - In the last step just click on create user

- Search for 'Simple Email Service' from amazon aws dashboard and you will land into 'account dashboard'
- Click on 'View Get set up page'
- Click on 'create identity'
= Select identity type as Domain 
- Enter Domain name as vinodsalunke.com
- In advancesDKIM settings , select 'Easy DKIM' and DKIM Signing key length equal to 'RSA_2048_BIT'
- Click on create identity
- After this you will see DNS records and that DNS records you need to add it in cludflare.com for vinodsalunke.com domain
- Go to cloudflare.com
- Go to vinodsalunke.com domain
- click on DNS->Records from left menu
- Add those DNS records as type CNAME in cloudflare and toggle off proxy status (Repeat this step for all DNS records which you get from Amazon SES)
- Wait for sometime to verify those DNS records by Amazon SES(Simple Email Service)
- After verification is completed . then click on 'Get set up'
- Click on 'Request production access'
- Select Mail type as 'Transactional'
- Enter website URL as 'https://vinodsalunke.com/'
- Enter additional contact email -> add 'salunkevinod45@gmail.com'
- check the terms 
- Submit the request

#Get secret key for IAM user 

- Go to IAM
- click on users
- select the user name which you have created
- go to 'Security credentials'
- click on 'create access key' under 'access key'
- select 'other' as use case
- click next 
- click on 'create access key'
- now you will get secret access key and access key 
- copy those secret access key and access key on your local machine

#Node Js code setup 

- Install AWS SDK - v3
- Code Example - https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ses-examples-sending-email.html


#Razorpay Integration 

- create a razorpay account 
- store razorpay credentials (secret key and access key)
- install razorpay node js package to backend project 
- create an api to store order to razorpay
- from frontend call create an order api based on type of subscription (gold or silver)
- once the order is created then open a checkout dialog box from frontend (call the razorpay open dialog box)
- Integrate web hook implementation in backend project 
  - create new endpoint which will inform backend about the status of payment and based on that payment update the order details like status in mongodb.







