pipeline{
	agent any
	environment{
		PROJECT_ID = 'opensource-436202'
		CLUSTER_NAME = 'kube'
		LOCATION = 'asia-northeast3-a'
		CREDENTIALS_ID = '6ba4ad2f2fcfa9ca1fbcd4c9e42a7c805847c0ad'
	}
	stages{
		stage("Checkout code"){
			steps{
				checkout scm
			}
		}
		stage("Build image"){
			steps{
				script{
					myapp = docker.build("nagaeng/yorijori:${env.BUILD_ID}")
					}
				}
			}
		stage("Push image"){
			steps{
				script{
					docker.withRegistry('https://registry.hub.docker.com', 'nagaeng'){
						myapp.push("latest")
						myapp.push("${env.BUILD_ID}")
						}
					}
				}
			}
		stage("Deploy to GKE"){
			when{
				branch 'master'
			}
			steps{
				sh "sed -i 's/yorijori:latest/yorijori:${env.BUILD_ID}/g' deployment.yaml"
			step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
				}
			}
		
		}
	}
