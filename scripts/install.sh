#!/bin/sh
echo 'Auto-generating default models...'
echo 'Generate "User" model'
./node_modules/sequelize-cli/lib/sequelize model:generate --name User --attributes username:string,roles:array,firstName:string,lastName:string,middleName:string,salutation:string,password:string,emailAddress:string,phoneNumber:string,updatedBy:string,createdBy:string --force
echo 'Generate "Team" model'
./node_modules/sequelize-cli/lib/sequelize model:generate --name Team --attributes name:string,roles:array --force