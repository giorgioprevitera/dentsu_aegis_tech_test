node {
    def packer = tool name: '1.2.2', type: 'biz.neustar.jenkins.plugins.packer.PackerInstallation'    
    git 'https://github.com/vilelm/dentsu_aegis_tech_test.git'
    
    stage('Preparation') { 
       sh "${packer}/packer build packer.json"
    }
}
