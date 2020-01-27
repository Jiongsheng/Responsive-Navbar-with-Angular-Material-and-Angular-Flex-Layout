1. Clone the other repo to your local machine:  
    git clone https://github.com/other-account/other-repository.git
2. Rename the local repo's current 'origin' to 'upstream'
    git remote rename origin upstream
3. Give the local repo an 'origin' that points to your web repo
    git remote add origin https://github.com/your-account/your-repository.git
4. Push the local repo to your web repo
    git push origin master
