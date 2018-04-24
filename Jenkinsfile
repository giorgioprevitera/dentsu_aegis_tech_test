ansiColor('xterm') {
  node {
      def packer = tool name: '1.2.2', type: 'biz.neustar.jenkins.plugins.packer.PackerInstallation'
      git 'https://github.com/vilelm/dentsu_aegis_tech_test.git'

      try {
        stage('Build') {
           sh "${packer}/packer build packer.json"
        }

        stage('Test') {
          sh "echo Testing container from image giorgioprevitera/dentsu_aegis_tech_test:0.1.${BUILD_NUMBER}"
          sh "export GOSS_SLEEP=2; dgoss run --rm giorgioprevitera/dentsu_aegis_tech_test:0.1.${BUILD_NUMBER}"
        }
        } finally {

        stage('Cleanup') {
          cleanWs()
        }
      }
  }
}
