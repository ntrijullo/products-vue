<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center"></div>
                <div class="card-body">
                    <form v-on:submit="saveProduct">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input type="text" v-model="name" class="form-control" id="name" placeholder="name" maxlength="50" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
                            <input type="text" v-model="description" class="form-control" id="description" placeholder="description" maxlength="150" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-dollar"></i></span>
                            <input type="number" v-model="price" class="form-control" id="price" placeholder="price" step="0.01" required>
                        </div>
                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success" ><i class="fa-solid fa-floppy-disk">  Save</i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { sendRequest, show_alert } from '@/funciones'
import { useRoute } from 'vue-router'
import axios from 'axios'

    export default{
        data(){
            return{
                id:0,
                name: '',
                description: '',
                price: '',
                url: 'http://localhost:8000/api/product'
            }
        },
        mounted(){
            const route = useRoute()
            this.id = route.params.id
            this.url = this.url+`/${this.id}`
            this.getProduct()
        },
        methods:{
            getProduct(){
                axios.get(this.url).then(
                    response => (
                        this.name = response.data.name,
                        this.description = response.data.description,
                        this.price = response.data.price
                    )
                )
            },
            saveProduct(){
                event.preventDefault();
                if(this.name.trim() === ''){
                    show_alert('Escribe el nombre','warning', 'name')
                }
                else if(this.description.trim() === ''){
                    show_alert('Escribe la descripción', 'warning', 'description')
                }else if(this.price === ''){
                    show_alert('Escribe el precio', 'warning', 'precio')
                }else{
                    var params = {
                        name: this.name.trim(),
                        description: this.description.trim(),
                        price: this.price
                    }
                    sendRequest('PATCH', params, this.url, 'Producto editado')
                }
            }
        }
    }
</script>