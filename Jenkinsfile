pipeline
{
    agent any
    tools 
    {
        nodejs 'Node'
    }
    environment{
      dockerhub=credentials('dockerhub')    
      }

stages
  {

  stage('Build')
  {
    steps
    {
      sh 'npm run build'
    }

  }
  



stage(‘package’)
{
  when {
    branch 'prod'
  }
    stages{
      stage('building docker image')
      {
        steps
        {
          sh 'docker build -t mayuridhote/capstone:${GIT_COMMIT} . '
        }
      }
      stage('pushing docker image')
      {
        steps{
          sh '''
          echo $dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin
          docker push mayuridhote/capstone:${GIT_COMMIT} 
          docker logout
          '''

        }
      }
      stage("Deploy to k8s")
      {
          
          steps{
                
             kubernetesDeploy configs: '**/deploy.yml', kubeConfig: [path: ''], kubeconfigId: 'kube-config', secretName: '', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
          }
      }
    }
}

}
}
