<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible="" v-for="message in mensagens" 
		:key="message.texto"
		:variant="message.tipo"
		> {{ message.texto }}</b-alert>
		<b-card>
			<b-form-group label="Nome: ">
				<b-form-input type="text" size="lg"
				v-model="usuario.nome"
				placeholder="Informe o nome">

				</b-form-input>
			</b-form-group>
			<b-form-group label="Email: ">
				<b-form-input type="email" size="lg"
					v-model="usuario.email"
					placeholder="Informe seu Email">
				</b-form-input>
			</b-form-group>
			<b-btn @click="salvar()" variant="primary" size="lg"> Enviar</b-btn>
			<b-button @click="pegaUsuarios" class="ml-4" variant="success" size="lg"> Obter Usuarios</b-button>
		</b-card>
		<hr>
		<b-list-group>
				<b-list-group-item v-for="(use, id) in usuarios" :key="id">
					<strong>Nome:</strong>{{ use.nome }}
					<br>
					<strong>Email: </strong>{{ use.email }}
					<br>
					<strong>ID:</strong> {{ id }}
					<br>
					<b-button variant="warning" size="lg"
					@click="carregar(id)"> Carregar </b-button>
					<b-button variant="danger" class="ml-4" size="lg"
					@click="excluir(id)">Excluir</b-button>
				</b-list-group-item>
		</b-list-group>
	</div>
</template>
<script>
export default {
	data() {
		return {
			usuarios: [],
			mensagens: [],
			id: null,
			usuario: {
				nome: '',
				email: ''
			}
		}
	},
	methods: {
			limpaForm() {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null
			this.mensagens =  []
		},
		carregar(id){
			this.id = id
			this.usuario = {...this.usuarios[id]}
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`).then(response => {
				if (response.status === 200) {
					this.limpaForm()
					this.mensagens.push({
						texto: 'user excluido com sucesso',
						tipo: 'success'
					})
					
				}
			})
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario).then(response => {
				this.limpaForm()
				this.mensagens.push({
					texto: 'Sucesso', 
					tipo: 'success'
				})
			})
		},
		async pegaUsuarios() {
			 await this.$http('usuarios.json').then(response => {
				this.usuarios= response.data
			}).catch(error => { 
				this.mensagens.push({
					texto:'erro ao buscar os usuários',
					tipo: 'danger'
				})
			})
		}
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
