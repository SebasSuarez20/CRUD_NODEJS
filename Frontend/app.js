'use strict';

let DataInfo = [];
let ChildbodyModal = document.querySelector('.modal-body').childNodes;
let btnAccion = document.getElementById('btn-accion');
let StrlNameBtn = '', id = 0;

function GetAll() {
  fetch('http://localhost:3000/?min=0&&max=5', {
    method: 'GET',
    // Puedes agregar encabezados si es necesario
    headers: {
      'Content-Type': 'application/json',
      // Otros encabezados según tus necesidades
    },
  })
    .then(response => {
      return response.json(); // Parsea la respuesta a JSON
    })
    .then(res => {
      LoadDatatable(res.data);
    })
    .catch(error => {
      console.error('Error en la solicitud: ', error);
    });

}

const PostAll = (data) => {
  fetch('http://localhost:3000/index', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json(); // Parsea la respuesta a JSON
    })
    .then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Creacion correcta del libro.',
        showConfirmButton: false,
        toast: true,
        timer: 2200
      }).then(() => {
        GetAll();
      })

    })
    .catch(error => {
      console.error('Error en la solicitud: ', error);
    });
}

function PutAll(id, data) {
  fetch(`http://localhost:3000/index/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json(); // Parsea la respuesta a JSON
    })
    .then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Se modifico correctamente del libro.',
        showConfirmButton: false,
        toast: true,
        timer: 1200
      }).then(() => {
        GetAll();
      })

    })
    .catch(error => {
      console.error('Error en la solicitud: ', error);
    });
}

function DeleteAll(id) {
  fetch(`http://localhost:3000/index/UpdateBook/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json(); // Parsea la respuesta a JSON
    })
    .then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Se Elimino correctamente el libro.',
        showConfirmButton: false,
        toast: true,
        timer: 1200
      }).then(() => {
        GetAll();
      })

    })
    .catch(error => {
      console.error('Error en la solicitud: ', error);
    });
}

function LoadDatatable(data) {

  let tableBody = document.querySelector('.info_table');
  DataInfo = [];
  tableBody.innerHTML = '';
  data.forEach(item => {
    tableBody.innerHTML += `
     <tr>
     <th>${item.title}</th>
     <th>${item.editorial}</th>
     <td>${item.edition}</td>
     <td>${item.author}</td>
     <td>
     <button id="${item._id}" onclick="DefAccionStrl('Modificar')" data-toggle="modal" data-target="#exampleModal" type="button"
      class="btn btn-primary btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
     <button id="btn-eliminar-${item._id}" type="button" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
     </td>
   </tr>
     `;
    DataInfo.push(item);
  });
  OnSubmitButton();
  DeleteItems();
}

function OnSubmitButton() {
  for (let index = 0; index < DataInfo.length; index++) {
    document.getElementById(DataInfo[index]._id).addEventListener('click', () => {
      document.getElementById('title').value = DataInfo[index].title;
      document.getElementById('editorial').value = DataInfo[index].editorial;
      document.getElementById('edition').value = DataInfo[index].edition;
      document.getElementById('author').value = DataInfo[index].author;
      id = DataInfo[index]._id;
    })
  }
}

function OnSubmitButtonModal() {

  btnAccion.textContent = StrlNameBtn;
  btnAccion.addEventListener('click', () => {
    let objBody = {
      "title": ChildbodyModal[1].value,
      "editorial": ChildbodyModal[5].value,
      "edition": ChildbodyModal[9].value,
      "author": ChildbodyModal[13].value,
      "publicationDate": new Date().toDateString(),
      "enabled": true
    }
    switch (btnAccion.childNodes[0].nodeValue) {
      case 'Insertar el libro':
        PostAll(objBody);
        break;
      case 'Modificar el libro':
        PutAll(id, objBody);
        break;
    }

    document.querySelector('.close').click();

  });
}

function DefAccionStrl(accion) {
  btnAccion.textContent = accion == 'Insertar' ? 'Insertar el libro' : 'Modificar el libro';
  if (accion == 'Insertar') {
    ChildbodyModal[1].value = '';
    ChildbodyModal[5].value = '';
    ChildbodyModal[9].value = '';
    ChildbodyModal[13].value = '';
  }
}

function DeleteItems() {
  for (let index = 0; index < DataInfo.length; index++) {
    document.getElementById(`btn-eliminar-${DataInfo[index]._id}`).addEventListener('click', () => {
      Swal.fire({
        icon: 'warning',
        title: '¿Desea eliminar el item?',
        showCancelButton: true,
        confirmButtonText: 'Si,eliminar',
        toast: true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          DeleteAll(DataInfo[index]._id);
        }
      })
    })
  }

}


GetAll();
OnSubmitButtonModal();

