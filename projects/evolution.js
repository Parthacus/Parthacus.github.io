
async function getText(){
  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  final_word = document.getElementById('final_string').value;
  function randomstring(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  async function update(generation , best_word, elements){
    document.getElementById("best_word").innerHTML = best_word;
    document.getElementById("generation").innerHTML = "Generation " +  generation + " :";
    var final_string = "";
    var space = "&nbsp;";
    for (word = 0; word <= elements.length; word += 5){
      final_string += elements[word] + space  + elements[word + 1] + space  + elements[word + 2] + space  + elements[word + 3]+ space  + elements[word + 4] + space  + elements[word + 5] + "<br>";
    }
    document.getElementById("elements").innerHTML = final_string
  }

  var fitness = [];
  function calc_fitness(){
    for (var word in elements){
      var fitness_temp = 0;
      for (var i = 0; i < final_word.length; i++) {
        if (final_word.charAt(i) == elements[word].charAt(i)){
          fitness_temp ++;
        }
      }
      fitness.push(fitness_temp);
    }

  }

  var normalized_fitness = [];
  function norm_fitness(){
    var total_score = 0;
    for (var score in fitness){
      total_score += fitness[score];
    }
    for (var score in fitness){
      normalized_fitness.push(fitness[score] / total_score);
    }
  }

  function get_fittest(){
    var largest_val = 0;
    var largest_val_pos = 0;
    for (var i in fitness){
      if (fitness[i] > largest_val){
        largest_val = fitness[i];
        largest_val_pos = i;
      }
    }
    return largest_val_pos;
  }

var elements = [];
for (i = 0; i < 500; i++) {
    elements.push(randomstring(final_word.length));
}
var generation = 0
var best_word
while (best_word != final_word){
  generation ++;
  fitness = [];
  normalized_fitness = [];
  calc_fitness();
  norm_fitness();
  best_word = elements[get_fittest()];

  var possible_parents = [];
  var parents = [];
  //creating a list of possible parents
  for (fitness_level in fitness){
    for (i = 0; i < fitness[fitness_level]; i++ ){
      possible_parents.push(elements[fitness_level]);

    }
  }
  console.log(possible_parents);
  //add randomly from possible parents list to reproduction list
  for (i = 0; i < 1000; i ++){
    parents.push(possible_parents[Math.floor((Math.random() * possible_parents.length))])
  }
  console.log(parents);

  elements = [];
  for (parent = 0; parent < 1000; parent += 2){
    rand = Math.floor((Math.random() * final_word.length) + 1);
    //console.log(parents[parent].substring(0, rand) + " + " + parents[parent + 1].substring(rand));
    var child = parents[parent].substring(0 , rand) + parents[parent + 1].substring(rand);
    for (letter_pos = 0; letter_pos < child.length; letter_pos ++){
      if (Math.random() < 0.01){
          list_child = child.split("");
          list_child[letter_pos] = randomstring(1);
          child = list_child.join('');  }
    }
    elements.push(child)
  }
  await sleep(50);
update(generation , best_word, elements);
}
}
