const cats = [
  {
    cat_id: 1,
    cat_name: "Kissa1",
    weight: 4.5,
    owner: "Mikko",
    birthdate: "1999-05-14",
  },
  {
    cat_id: 2,
    cat_name: "kissa2",
    weight: 11,
    owner: "myösmikko",
    birthdate: "2090-10-12",
  },
];

function getCats() {
  return cats;
}

function getOneCat(id) {
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].cat_id == id) {
      return cats[i];
    }
  }
  return null;
}

function addNewCat(data, filename) {
  const newId = cats.length + 1;
  const newCat = {
    cat_id: newId,
    cat_name: data.cat_name,
    weight: data.weight,
    owner: data.owner,
    birthdate: data.birthdate,
    filename: filename,
  };
  cats.push(newCat);
  return newCat;
}

export { getCats, getOneCat, addNewCat };
