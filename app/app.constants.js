app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
app.constant('API_ENDPOINT', {
  url: 'http://localhost:8080/api'
});
app.constant('AUTH_ROLES', {
	admin: 'role-admin',
	normal: 'role-normal',
	guest: 'role-guest'
});


app.constant('DEBUG_DATA', {
	accounts: [{
		role:"",
		account: "demo001",
		psd: "psd001"
	},{
		role:"",
		account: "demo001",
		psd: "psd001"
	},{
		role:"",
		account: "demo001",
		psd: "psd001"
	},{
		role:"",
		account: "demo001",
		psd: "psd001"
	}],
	partnumbers: [{
		editorId: "user001",
		companyId: "company001",
		customerId: "customer001",
		remark: "remark001"
	},{
		editorId: "user002",
		companyId: "company002",
		customerId: "customer002",
		remark: "remark002"
	},{
		editorId: "user003",
		companyId: "company003",
		customerId: "customer003",
		remark: "remark003"
	},{
		editorId: "user004",
		companyId: "company004",
		customerId: "customer004",
		remark: "remark004"
	}]
})