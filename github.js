class Github{
    constructor() {
        // ------ this is for hiding git keys --------
        const id = null;
        const secret = null;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'client_ID.txt', true);
        xhr.onload = function() {
            if(this.status === 200){
                id = this.responseText;
            }
        }

        xhr.open('GET', 'client_Secret.txt', true);
        xhr.onload = function() {
            if(this.status === 200){
                secret = this.responseText;
            }
        }
        // ----------------------------------------------

        // use your git client id here
        this.client_id = id;  

        // use your git client secret key here   
        this.client_secret = secret;

        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();

        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}