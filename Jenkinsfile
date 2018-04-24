ansiColor('xterm') {
  node {
      def packer = tool name: '1.2.2', type: 'biz.neustar.jenkins.plugins.packer.PackerInstallation'
      def ci_image_name = "ci-dentsu-aegis-tech-test"
      def docker_repository_prefix = "giorgioprevitera"

      git 'https://github.com/vilelm/dentsu_aegis_tech_test.git'

      try {
        stage('Build') {
           sh "${packer}/packer build -var 'docker_repository_prefix=${docker_repository_prefix}' -var 'ci_image_name=${ci_image_name}' packer.json"
        }

        stage('Test') {
          sh "echo Testing container from image ${docker_repository_prefix}/${ci_image_name}:0.1.${BUILD_NUMBER}"
          sh "export GOSS_SLEEP=2; dgoss run --rm ${docker_repository_prefix}/${ci_image_name}:0.1.${BUILD_NUMBER}"
        }
        } finally {

        stage('Cleanup') {
          cleanWs()
        }
      }
  }
}
