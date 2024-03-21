import React from 'react';

import { Alert, AlertActionCloseButton, Button, FormSection } from '@patternfly/react-core';
import { useNavigate, useParams } from 'react-router-dom';

import { PipelineRunTabTitle, PipelineRunType } from '~/pages/pipelines/global/runs';
import {
  CreateRunPageSections,
  runPageSectionTitles,
} from '~/concepts/pipelines/content/createRun/const';
import { PipelineRunSearchParam } from '~/concepts/pipelines/content/types';
import { runsBaseRoute } from '~/routes';
import { SupportedArea, useIsAreaAvailable } from '~/concepts/areas';

interface RunTypeSectionProps {
  runType: PipelineRunType;
}

export const RunTypeSection: React.FC<RunTypeSectionProps> = ({ runType }) => {
  const navigate = useNavigate();
  const { namespace, experimentId } = useParams();
  const [isAlertOpen, setIsAlertOpen] = React.useState(true);
  const isExperimentsAvailable = useIsAreaAvailable(SupportedArea.PIPELINE_EXPERIMENTS).status;

  let runTypeValue = 'Run once immediately after creation';
  let alertProps = {
    title: 'Go to Schedules to create schedules that execute recurring runs',
    label: `Go to ${PipelineRunTabTitle.Schedules}`,
    navSearch: `?${PipelineRunSearchParam.RunType}=${PipelineRunType.Scheduled}`,
  };

  if (runType === PipelineRunType.Scheduled) {
    runTypeValue = 'Schedule recurring run';
    alertProps = {
      title: 'Go to Active runs to create a run that executes once immediately after creation.',
      label: `Go to ${PipelineRunTabTitle.Active} runs`,
      navSearch: `?${PipelineRunSearchParam.RunType}=${PipelineRunType.Active}`,
    };
  }

  return (
    <FormSection
      id={CreateRunPageSections.RUN_TYPE}
      title={runPageSectionTitles[CreateRunPageSections.RUN_TYPE]}
    >
      {runTypeValue}

      {isAlertOpen && (
        <Alert
          isInline
          variant="info"
          title={alertProps.title}
          actionLinks={
            <Button
              isInline
              variant="link"
              onClick={() =>
                navigate({
                  pathname: runsBaseRoute(
                    namespace,
                    isExperimentsAvailable ? experimentId : undefined,
                  ),
                  search: alertProps.navSearch,
                })
              }
            >
              {alertProps.label}
            </Button>
          }
          actionClose={<AlertActionCloseButton onClose={() => setIsAlertOpen(false)} />}
        />
      )}
    </FormSection>
  );
};
