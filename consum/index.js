const h4 = document.querySelector('h4')
const Laval = "http://localhost:5000/Laval/"
const UCSanDiego = "http://localhost:5000/UCSanDiego/"
const Hertfordshire = "http://localhost:5000/Hertfordshire/"
const Programs = "http://localhost:5000/Laval/programs/"
const selection = document.querySelector('#programs')
const Laval_div = document.querySelector('#Laval')
const UCSanDiego_div = document.querySelector('#UCSanDiego')
const Hertfordshire_div = document.querySelector('#Hertfordshire')
const laval_image = "https://www4.fsa.ulaval.ca/wp-content/themes/fsa/img/logo-ul.svg"
const ucsan_image = "https://iconape.com/wp-content/png_logo_vector/uc-san-diego.png"
const hertford_image = "./hertford.svg"
const fees = document.querySelector('#fees')
const credits = document.querySelector('#credits')
const duree = document.querySelector('#duree')


async function getPrograms(url){
  let programs = await fetch(url)
  if (programs.status != 200){
    return false
  }
  let data = await programs.json()
  return data
  // console.log(data)
}

async function createPage(){
  data = await getPrograms(Programs)
  data.forEach((item, i) => {
    option = itembuilder(item)
    selection.appendChild(option)
  })
}


selection.addEventListener('change', async (e)=>{
  Laval_div.innerHTML = ''
  Hertfordshire_div.innerHTML = ''
  UCSanDiego_div.innerHTML = ''
  item = selection.options[selection.selectedIndex].value

  data_laval = await getPrograms(Laval + '/programs/' + item)
  data_hertford = await getPrograms(Hertfordshire + '/programs/' + item)
  data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item)

  n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

  for (let i = 0; i < n; i++) {
    carte_laval = cartebuilder(data_laval[i], laval_image)
    carte_hertford = cartebuilder(data_hertford[i], hertford_image)
    carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

    Laval_div.appendChild(carte_laval)
    Hertfordshire_div.appendChild(carte_hertford)
    UCSanDiego_div.appendChild(carte_ucsan)

  }

  // trie par les fees

  fees.addEventListener('click', async (e)=>{
    if (fees.checked) {
      Laval_div.innerHTML = ''
      Hertfordshire_div.innerHTML = ''
      UCSanDiego_div.innerHTML = ''

      data_laval = await getPrograms(Laval + '/programs/' + item + '/sorted/fees')
      data_hertford = await getPrograms(Hertfordshire + '/programs/' + item + '/sorted/fees' )
      data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item + '/sorted/fees')

      n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

      for (let i = 0; i < n; i++) {
        carte_laval = cartebuilder(data_laval[i], laval_image)
        carte_hertford = cartebuilder(data_hertford[i], hertford_image)
        carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

        Laval_div.appendChild(carte_laval)
        Hertfordshire_div.appendChild(carte_hertford)
        UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  else {
    Laval_div.innerHTML = ''
    Hertfordshire_div.innerHTML = ''
    UCSanDiego_div.innerHTML = ''

    data_laval = await getPrograms(Laval + '/programs/' + item)
    data_hertford = await getPrograms(Hertfordshire + '/programs/' + item)
    data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item)

    n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

    for (let i = 0; i < n; i++) {
      carte_laval = cartebuilder(data_laval[i], laval_image)
      carte_hertford = cartebuilder(data_hertford[i], hertford_image)
      carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

      Laval_div.appendChild(carte_laval)
      Hertfordshire_div.appendChild(carte_hertford)
      UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  })

  // trie par duree
  duree.addEventListener('click', async (e)=>{
    if (duree.checked) {
      Laval_div.innerHTML = ''
      Hertfordshire_div.innerHTML = ''
      UCSanDiego_div.innerHTML = ''

      data_laval = await getPrograms(Laval + '/programs/' + item + '/sorted/duree')
      data_hertford = await getPrograms(Hertfordshire + '/programs/' + item + '/sorted/duree' )
      data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item + '/sorted/duree')

      n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

      for (let i = 0; i < n; i++) {
        carte_laval = cartebuilder(data_laval[i], laval_image)
        carte_hertford = cartebuilder(data_hertford[i], hertford_image)
        carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

        Laval_div.appendChild(carte_laval)
        Hertfordshire_div.appendChild(carte_hertford)
        UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  else {
    Laval_div.innerHTML = ''
    Hertfordshire_div.innerHTML = ''
    UCSanDiego_div.innerHTML = ''

    data_laval = await getPrograms(Laval + '/programs/' + item)
    data_hertford = await getPrograms(Hertfordshire + '/programs/' + item)
    data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item)

    n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

    for (let i = 0; i < n; i++) {
      carte_laval = cartebuilder(data_laval[i], laval_image)
      carte_hertford = cartebuilder(data_hertford[i], hertford_image)
      carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

      Laval_div.appendChild(carte_laval)
      Hertfordshire_div.appendChild(carte_hertford)
      UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  })

  // trie par credits
  credits.addEventListener('click', async (e)=>{
    if (credits.checked) {
      Laval_div.innerHTML = ''
      Hertfordshire_div.innerHTML = ''
      UCSanDiego_div.innerHTML = ''

      data_laval = await getPrograms(Laval + '/programs/' + item + '/sorted/credits')
      data_hertford = await getPrograms(Hertfordshire + '/programs/' + item + '/sorted/credits' )
      data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item + '/sorted/credits')

      n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

      for (let i = 0; i < n; i++) {
        carte_laval = cartebuilder(data_laval[i], laval_image)
        carte_hertford = cartebuilder(data_hertford[i], hertford_image)
        carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

        Laval_div.appendChild(carte_laval)
        Hertfordshire_div.appendChild(carte_hertford)
        UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  else {
    Laval_div.innerHTML = ''
    Hertfordshire_div.innerHTML = ''
    UCSanDiego_div.innerHTML = ''

    data_laval = await getPrograms(Laval + '/programs/' + item)
    data_hertford = await getPrograms(Hertfordshire + '/programs/' + item)
    data_ucsan = await getPrograms(UCSanDiego + '/programs/' + item)

    n = Math.min(data_laval.length, data_ucsan.length, data_hertford.length)

    for (let i = 0; i < n; i++) {
      carte_laval = cartebuilder(data_laval[i], laval_image)
      carte_hertford = cartebuilder(data_hertford[i], hertford_image)
      carte_ucsan = cartebuilder(data_ucsan[i], ucsan_image)

      Laval_div.appendChild(carte_laval)
      Hertfordshire_div.appendChild(carte_hertford)
      UCSanDiego_div.appendChild(carte_ucsan)

    }
  }
  })
  // data_laval.forEach((item, i) => {
  //   carte = cartebuilder(item)
  //   Laval_div.appendChild(carte)
  // })
  //
  // console.log(data_laval)

})



createPage()


function itembuilder(item){
  option = document.createElement('option')
  option.setAttribute('value', item)
  option.innerText = item

  return option
}

function cartebuilder(item, src){
  carte = document.createElement('div')
  carte.innerHTML = `
  <a href="${item.href}">
  <div class="grid-item">
    <div class="card">
      <img class="card-img" src="${src}" alt="Rome" />
      <div class="card-content">
        <h1 class="card-header">${item.name}</h1>
        <p class="card-text">
          <span>Duree: <strong>${item.duree}</strong> </span>
          <br>
          <span>Credits: <strong>${item.credits}</strong> </span>
        </p>
        <button class="card-btn"><span>$${item.fees}</span></button>
      </div>
    </div>
  </div>
  </a>
  `
  return carte
}
