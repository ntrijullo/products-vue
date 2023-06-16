<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>{{ product.id}}</td>
              <td>{{ product.name}}</td>
              <td>{{ product.description}}</td>
              <td>{{ product.price}}</td>
              <td class="text-center">
                <div class="row justify-content-between">
                  <div class="col my-1">
                    <router-link :to="{path:'edit/'+product.id}" class="btn btn-warning">
                      <i class="fa-solid fa-edit"></i>
                    </router-link>
                  </div>
                  <div class="col my-1">
                    <button class="btn btn-danger" v-on:click="deleteProduct(product.id, product.name)">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {confirm} from '../funciones'
  export default{
    data(){
      return{
        products: null,
        paginate: null
      }
    },
    mounted(){
      this.getProducts();
    },
    methods:{
      getProducts(){
        axios.get('http://localhost:8000/api/product')
        .then(response => (this.products = response.data.data))
      },
      deleteProduct(id, name){
        confirm(id, name)
      }
    }

  }
</script>
