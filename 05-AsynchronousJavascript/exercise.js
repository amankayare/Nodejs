/*

-----------------------Callback Hell -----------------------
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    });
  }, 4000);  
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['movie1', 'movie2']);
  }, 4000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}

Q- Convert above callback functions into async and  await function

*/

//----------solution----------

function getCustomer(id) {

    return new Promise((resolved, rejected) => {

        setTimeout(() => {
            resolved({
                id: 1,
                name: 'Aman Kayare',
                isGold: true,
                email: 'amankayare@gmail.com'
            });
        }, 4000);
    });
}

function getTopMovies() {

    return new Promise((resolved, rejected) => {

        setTimeout(() => {
            resolved(['movie1', 'movie2']);
        }, 4000);
    });
}
function sendEmail(email, movies) {

    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            resolved(`email send to ${email} successfully`);
        }, 4000);
    });
}

async function operation(id) {

    try {
        const user = await getCustomer(id);
        console.log('Customer: ', user);
        if (user.isGold) {

            const topMovies = await getTopMovies();
            console.log('Top movies: ', topMovies);
            const result = await sendEmail(user.name, topMovies);
            console.log(result);
        }
    }
    catch (err) {
        console.log(err);
    }

}
operation(20);