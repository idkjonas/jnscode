{ pkgs }: {
  deps = [
    pkgs.npm run dev
    pkgs.npm
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}