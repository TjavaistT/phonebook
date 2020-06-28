mvn -DskipTests=true clean dependency:list install
java  -DPORT=8080  -jar target/dependency/webapp-runner.jar target/*.war