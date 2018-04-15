import * as React from 'react';
import { pages, versionUnknown } from '../util/constants';
import { getReadableFileSize } from '../util/npm-parser';
import PageContainer from '../components/PageContainer';
import BarGraph from '../components/BarGraph';
import Stats from '../components/Stats';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Image from '../components/Image';
import { getBadgeUrl } from '../util/badge';
import { hostname } from '../util/constants';

const error: React.CSSProperties = {
    fontSize: '2.3rem',
    color: '#D33',
};

export default class ResultPage extends React.Component<ResultProps, {}> {
    render() {
        const { pkgSize, readings } = this.props;
        const exists = pkgSize.version !== versionUnknown;
        const install = getReadableFileSize(pkgSize.installSize);
        const publish = getReadableFileSize(pkgSize.publishSize);
        const pkgNameAndVersion = `${pkgSize.name}@${pkgSize.version}`;
        const badgeUrl = getBadgeUrl(pkgSize);
        const markdown = `![install size](https://${hostname}${pages.badge}?p=${pkgNameAndVersion})`;

        return (
            <>
                <PageContainer>
                    <SearchBar autoFocus={false} defaultValue={pkgNameAndVersion} />
                    {exists ? (
                        <div style={{ padding: '10px 0' }}>
                            <details>
                                <summary>
                                    <img src={badgeUrl} />
                                </summary>
                                <p>
                                    Copy and paste the following into your README.md:<br />
                                    <input
                                        type="text"
                                        defaultValue={markdown}
                                        style={{ width: '100%', fontFamily: 'monospace' }}
                                    />
                                </p>
                            </details>
                        </div>
                    ) : (
                        <p style={error}>A Tumbeast ate your package</p>
                    )}
                    {exists ? (
                        <div className="content-container">
                            <Stats publish={publish} install={install} />
                            <BarGraph readings={readings} getHref={getHref} />
                        </div>
                    ) : (
                        <Image width={350} height={350} file="tumblebeasts/tbstand2.png" />
                    )}
                    <p>
                        See more info about this package on{' '}
                        <a href={`https://www.npmjs.com/package/${pkgSize.name}`}>npmjs.com</a>
                    </p>
                </PageContainer>
                <Footer />
            </>
        );
    }
}

const getHref = (r: PkgSize) => `${pages.result}?p=${r.name}@${r.version}`;
