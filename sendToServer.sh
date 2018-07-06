echo 'Generating tarball'
tar -zcvf study_assets_root.tgz study_assets_root

echo 'Sending tarball'
scp study_assets_root.tgz langdev@167.99.177.178:~/MusicLang/study_assets_root.tgz

echo 'SSH'
ssh langdev@167.99.177.178 '
cd ~/MusicLang/
rm -r study_assets_root
tar -xvzf study_assets_root.tgz
rm study_assets_root.tgz
rm ~/MusicLang/study_assets_root/musiclang_engnat/shared_assets
ln -s ~/MusicLang/study_assets_root/shared_assets ~/MusicLang/study_assets_root/musiclang_engnat/shared_assets
rm ~/MusicLang/study_assets_root/musiclang_mannat/shared_assets
ln -s ~/MusicLang/study_assets_root/shared_assets ~/MusicLang/study_assets_root/musiclang_mannat/shared_assets

'

echo 'Removing local tarball'
rm study_assets_root.tgz