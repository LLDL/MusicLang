echo 'Generating tarball'
cd study_assets_root
tar -zcvf questionaire.tgz questionaire

echo 'Sending tarball'
scp questionaire.tgz langdev@167.99.177.178:~/MusicLang/study_assets_root/questionaire.tgz

echo 'SSH'
ssh langdev@167.99.177.178 '
cd ~/MusicLang/study_assets_root
rm -r questionaire
tar -xvzf questionaire.tgz
rm questionaire.tgz
'

echo 'Removing local tarball'
rm questionaire.tgz