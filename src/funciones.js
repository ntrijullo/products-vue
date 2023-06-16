import Swal from "sweetalert2"
import axios from 'axios'

export function show_alert(mensaje, icono, foco=''){
    if(foco !==''){
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title:mensaje,
        icon:icono,
        customClass: {confirmButton: 'btn btn-primary', popup: 'animated zoom'},
        buttonsStyling: false
    })
}

export function confirm(id, name){
    var url = 'http://localhost:8000/api/product/'+id
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {confirmButton:'btn btn-success me-3', cancelButton:'btn btn-danger'},
        buttonsStyling:false
    })
    swalWithBootstrapButtons.fire({
        title:'Seguro de eliminar el producto '+name,
        text: 'Se perderá la información del producto',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            sendRequest('DELETE', {id:id}, url, 'Producto eliminado')
        }else{
            show_alert('Operación cancelada', 'info');
        }

    })
}

export function sendRequest(method,params, url, msg){
    axios({
        method:method,
        url:url,
        data:params
    }).then(function(response){
        var status = response.data
        if(status.message === 'ok'){
            show_alert(msg, status)
            window.setTimeout(function(){
                window.location.href = '/'
            }, 1000)
        }else{
            var list = ''
            var errors = response.data.data[1]['errors']
            Object.keys(errors).forEach(
                key => list += errors[key][0]+'.'
            )
            show_alert(list, 'error')
        }
    }).catch(function(error){
        show_alert('Error en la solicitud', 'error');
    })
}