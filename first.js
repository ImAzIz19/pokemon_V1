const poke1 = {
    pokename: []
};
  
  let idp;
  let abelitename = [];
  let typename = [];
  let statname = {};
  let helditem = [];
  let weight;
  let height;
  let moreinfo; 
window.addEventListener('DOMContentLoaded', function() {
    poketest = localStorage.getItem("data").toLowerCase();
    displaysize();
});
const getpokidata = async () => {
    try {  
      const getdata = await fetch(`https://pokeapi.co/api/v2/pokemon/${poketest}`);
      const jsondata = await getdata.json();
      poke1.pokename = jsondata;
      moreinfo = abelitename = await abilities(poke1.pokename.abilities, poke1.pokename.abilities.length);
      typename = await types(poke1.pokename.types, poke1.pokename.types.length);
      statname = await stat(poke1.pokename.stats, poke1.pokename.stats.length);
      helditem = await held(poke1.pokename.held_items, poke1.pokename.held_items.length);
      console.log(poketest);
      weight = poke1.pokename.weight;
      height = poke1.pokename.height;
      idp = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${poke1.pokename.id}.svg`;
      console.log(poketest);
      return poke1.pokename;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
}; 
function abilities(arr, n) {
    const t = [];
    for (let i = 0; i < n; i++) {
        t.push(poke1.pokename.abilities[i].ability.name);
    }
    return t;
}

function types(arr, n) {
    const t = [];
    for (let i = 0; i < n; i++) {
        t.push(arr[i].type.name);
    }
    return t;
}

function stat(arr, n) {
    const t = {};
    for (let i = 0; i < n; i++) {
        t[arr[i].stat.name] = arr[i].base_stat;
    }
    return t;
}

function held(arr, n) {
    const t = [];
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            t.push(arr[i].item.name);
        }
    } else {
        t.push("null");
    }
    return t;
}

async function fetchAndDisplayPokemonImage() {
    try {
        await getpokidata();
        let image = document.getElementById("myimage");
        image.src = idp;
        document.getElementById("pokename").innerHTML = poketest.toUpperCase();
    } catch (error) {
        console.log("Error:", error);
    }
}

async function displaystat() {
    try {
        await fetchAndDisplayPokemonImage();
        document.getElementById("hp").innerHTML = "HP: " + statname.hp;
        document.getElementById("atc").innerHTML = "Attack: " + statname.attack;
        document.getElementById("df").innerHTML = "Defense: " + statname.defense;
        document.getElementById("sa").innerHTML = "S-attack: " + statname["special-attack"];
        document.getElementById("sd").innerHTML = "S-defense: " + statname["special-defense"];
        document.getElementById("sp").innerHTML = "Speed: " + statname.speed;
    } catch (error) {
        document.getElementById("pokename").innerHTML = "error";
    }
}

async function displaytype() {
    try {
        await displaystat();
        let typedis = "-";
        for (let i = 0; i < typename.length; i++) {
            typedis += typename[i].toUpperCase() + "-";
        }
        document.getElementById("type").innerHTML = typedis;
    } catch (error) {
        document.getElementById("pokename").innerHTML = "error";
    }
}

async function displayabil() {
    try {
        await displaytype();
        let abilitiesdis = "-";
        for (let i = 0; i < abelitename.length; i++) {
            abilitiesdis += abelitename[i].toUpperCase() + "-";
        }
        document.getElementById("abilities").innerHTML = abilitiesdis;
    } catch (error) {
        document.getElementById("pokename").innerHTML = "error";
    }
}

async function displaysize() {
    try {
        await displayabil();
        document.getElementById("hight").innerHTML = height / 10 + "cm";
        document.getElementById("weight").innerHTML = weight / 10 + "Kg";
    } catch (error) {
        document.getElementById("pokename").innerHTML ="error";
    }
}
displaysize()