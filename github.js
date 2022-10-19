class Github{
    constructor() {
        // ------ this is for hiding git keys --------
        // if you use direct key under client id and secret please comment this code block
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

        // use your git client id here - replace id variable to key string with '' like '2343254523'
        this.client_id = id;  

        // use your git client secret key here - replace secret variable to key with ''  like '2343254523' 
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