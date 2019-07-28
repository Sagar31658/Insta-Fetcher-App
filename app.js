const request = require('request');
// const prompts = require('prompts');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('app.ejs');
});


app.post('/index',(req,res) => {
    let username = (req.body.usernam);

    request('https://www.instagram.com/'+username+'/?__a=1',(error, response, body) => {
        if(error){
            console.log("Sorry");
        }
        else{
            let user = JSON.parse(body);
            let username = user.graphql.user.username;
            let Followers = user.graphql.user.edge_followed_by.count;
            let Following = user.graphql.user.edge_follow.count;
            let Posts = user.graphql.user.edge_owner_to_timeline_media.count;
            let Fullname = user.graphql.user.full_name;
            let Bio = user.graphql.user.biography;
            let DP = user.graphql.user.profile_pic_url_hd;

            res.render('user.ejs',{
                username:username,
                Followers:Followers,
                Following:Following,
                Fullname:Fullname,
                Posts:Posts,
                Bio:Bio,
                DP:DP
            });
        }
    });

 });

    
app.listen(process.env.PORT || 3000,() => {
    console.log('Server is Running!');
});







// (async () => {
//     console.log('Starting Terminal scraper...')
//     const response = await prompts({
//       type: 'text',
//       name: 'username',
//       message: 'Which User you like to scrape??'
//     });
//     console.log('Starting to scrape')
//     getFollowers(response.username)
//   })();
// const getFollowers = (username) => {
//     request(`https://www.instagram.com/${username}/?__a=1`,(error, response, body) => {
//         if(error){
//             console.log(error);
//         }
//         else{
//             let user = JSON.parse(body);
//             let username = user.graphql.user.username;
//             let Followers = user.graphql.user.edge_followed_by.count;
//             let Following = user.graphql.user.edge_follow.count;
//             let Posts = user.graphql.user.edge_owner_to_timeline_media.count;
//             let Fullname = user.graphql.user.full_name
//             console.log('Your Username is '+username+ '. You Has '+Followers+' followers and '+ Following+' followings. Your Full Name is '+Fullname+' . You have posted '+Posts+' posts.');
//         }
//     });

// };