# SEGUNDA ENTREGA

React

## Modificaciones del back
- En los endpoints de tipo "$app->get('/reservas/{id}', ReservaController::class . ':buscar')" se modifico la respuesta.
    Antes devolvia algo como: 
        $respuesta = $reserevas = array[reserva], message;
    Ahora devuleve: 
        $respuesta = reserva,message;
- En el modelo dataBase se modifico para que al tomar un boolean antes de almancenarlo lo convierte en 0, en update y el save: 
      if ($value === false) {
        $value = 0;
    }
- En las funciones update, antes se llamaba a findOrNew, busca en db si existe por ejemplo en el caso de inquilino uno con el mismo DNI, antes de hacer el update. Esto 
    con el fin de evitar la duplicidad. Pero si se quiere editar un inquilino y cambiar solamente el nombre, esta funcion devuelve un inquilino(El mismo que se esta editando) y devuelve el error. Se soluciono simplemente haciendo una funcion new, que devuelve un nuevo inquilino con los datos del anterior, este es el que hace el update sobre el id.
    Tambien se podria solucionar ignorandose asi mismo cuando se hace e lllamda a findOrNew.
- Se modifico los filtros de propiedad. Antes los recibiamos en el body, ahora en la url.
- Correcciones varios, como en vez de devolver 'status' generalizamos a 'message'.

    
