let config_url = ""
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    config_url = 'http://sjxf.5cy.com/people/'
}else{
    // 生产环境
    config_url = 'http://sjxf.5cy.com/people/'
}
export default config_url