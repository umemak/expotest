#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.128.0/containers/typescript-node-14/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-14

# ** [Optional] Uncomment this section to install additional packages. **
#
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends net-tools lsof vim \
    && npm install -g npm expo-cli
    && wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -O ~/.git-completion.bash
    && chmod a+x ~/.git-completion.bash
    && echo "source ~/.git-completion.bash" >> ~/.bashrc

