# BACK-skills
Use vector and select the best skill to answer user

## Load skill

Skills are loaded in the volume `data_skills`. If not exist, the volume will be created.
To load skills, run the followin command :
```
docker run -it -v kara_data_skills:/home/node/Karassistant_skills/data/skills codyisthesenate/karassistant-back-skills loadSkills
```
