FROM node:18.13.0

COPY ./package*.json /home/node/Karassistant_skills/
WORKDIR /home/node/Karassistant_skills/
RUN npm install --omit=dev
COPY . /home/node/Karassistant_skills/

ENTRYPOINT ["npm", "run"]
CMD ["start"]