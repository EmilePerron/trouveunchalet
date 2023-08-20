<?php

namespace App\Doctrine\Functions;

use CrEOF\Spatial\ORM\Query\AST\Functions\AbstractSpatialDQLFunction;

/**
 * STDistanceSphere DQL function
 */
class STDistanceSphere extends AbstractSpatialDQLFunction
{
    protected $platforms = array('mysql');
    protected $functionName = 'ST_Distance_sphere';
    protected $minGeomExpr = 2;
    protected $maxGeomExpr = 2;

}
