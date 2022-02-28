import React, { useMemo } from 'react';

import Graph from 'components/Graph';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import { TraceReducer } from 'types/reducer/trace';
import Spinner from 'components/Spinner';
import { Container } from './styles';
import { Typography } from 'antd';
import { getChartData, getChartDataforGroupBy } from './config';

const TraceGraph = () => {
	const { spansGraph, selectedGroupBy } = useSelector<AppState, TraceReducer>(
		(state) => state.traces,
	);

	const { loading, error, errorMessage, payload } = spansGraph;

	const ChartData = useMemo(() => {
		return selectedGroupBy.length === 0
			? getChartData(payload)
			: getChartDataforGroupBy(payload);
	}, [payload]);

	if (error) {
		return (
			<Container center>
				<Typography>{errorMessage || 'Something went wrong'}</Typography>
			</Container>
		);
	}

	if (loading || payload === undefined) {
		return (
			<Container>
				<Spinner height={'20vh'} size="small" tip="Loading..." />
			</Container>
		);
	}

	return (
		<Container>
			<Graph data={ChartData} name="traceGraph" type="line" />
		</Container>
	);
};

export default TraceGraph;
