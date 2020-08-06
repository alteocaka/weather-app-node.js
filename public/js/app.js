const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#para1');
const message2 = document.querySelector('#para2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch(
        "http://api.weatherstack.com/current?access_key=6b267e6977eba4698841d86a5522784a&query=" + location
      ).then((response) => {
          response.json().then((data) => {
              if(data.error){
                  console.log('Error, could not fetch data!')
                  message1.textContent = 'Error, could not fetch data!';
              }
              else{
                  console.log(data.location);
                  console.log(data.current);
                  message1.textContent = data.location;
                  message2.textContent = data.current;
              }
          });
      });
})
