ansiColor('xterm') {
  node {
      def packer = tool name: '1.2.2', type: 'biz.neustar.jenkins.plugins.packer.PackerInstallation'
      def ci_image_name = "ci-dentsuaegistechtest"
      def image_name = "dentsuaegistechtest"
      def docker_repository_prefix = "dentsuaegistechtest"

      git 'https://github.com/vilelm/dentsu_aegis_tech_test.git'

      try {
        stage('Validate') {
          sh "echo Validating Packer templates"
          sh "for f in packer-templates/*.json;do ${packer}/packer validate \${f};done"
        }
        stage('Build') {
           sh "${packer}/packer build -var 'ci_image_name=${ci_image_name}' packer-templates/build.json"
        }

        stage('Test') {
          sh "echo Testing container from image ${ci_image_name}:0.1.${BUILD_NUMBER}"
          sh "export GOSS_SLEEP=2; dgoss run --rm ${ci_image_name}:0.1.${BUILD_NUMBER}"
        }

        stage('Publish') {
          withDockerRegistry([ credentialsId: "9030e075-64f8-4e1d-8d2d-6a50cbda07cf", url: "" ]) {
            sh "${packer}/packer build  -var 'ci_image_name=${ci_image_name}' -var 'docker_repository_prefix=${docker_repository_prefix}' -var 'image_name=${image_name}' packer-templates/publish.json"
          }
        }
        } finally {

        stage('Cleanup') {
          cleanWs()
        }
      }
  }
}
