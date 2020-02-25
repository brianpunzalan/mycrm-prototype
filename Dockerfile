FROM node

ARG APP_HOME
ENV PORT 8080

# Change Workdirectory
WORKDIR $APP_HOME

# Check Yarn version
RUN yarn -v

# Install app dependencies
COPY package.json $APP_HOME
RUN yarn

# Copy source code
COPY . $APP_HOME

CMD ["npm", "run", "production"]

EXPOSE $PORT
STOPSIGNAL SIGINT